# agent-loop-test

Throwaway sandbox for exercising [`reqio-app/feedback-to-pr`](https://github.com/reqio-app/feedback-to-pr)
end to end against a live Reqio project. Nothing here is production code. Safe to delete.

## What is being tested

1. The scheduled poll finds a bug someone moved to In progress and opens a pull request. That
   status move is the approval, which is the shipped default (`auto-approve: false`). To exercise
   the other path, where the poll claims a brand new bug on its own, flip `auto-approve` to
   `"true"` for that run and put it back after.
2. The developer note on the Reqio request gets the pull request URL.
3. Merging that pull request fires `pull_request: closed`, the merge workflow marks the
   request COMPLETED, and the reporter is notified.

Step 3 is the interesting one. GitHub suppresses workflow triggers for commits made with the
default `GITHUB_TOKEN`, and whether that suppression extends to a pull request opened by that
token is the one link in the loop that has never been verified.

## Deliberately cheap

`agent-command` is set to `true`, the shell no-op. It exits 0 without touching the checkout, so
every run costs zero model spend and still exercises the whole pipeline. The pull request comes
out as a draft carrying an agent log instead of a diff, which is exactly what the action does
when an agent produces no changes.

## Repository setup this needed

- Settings, Actions, General, Workflow permissions: **Read and write**
- Same page: **Allow GitHub Actions to create and approve pull requests** ticked
- Settings, Secrets and variables, Actions: `REQIO_API_KEY`
- Settings, Pages: deploy from `main`, root, so the widget page below is reachable

The first two are off by default on every new repository, and a workflow file cannot override
them. On an org-owned repository they are greyed out entirely, because org policy is a ceiling
and repositories may only go more restrictive.

## The widget page

`index.html` embeds the live Reqio widget, so bugs can be filed the way a real visitor would
file them rather than seeded through the API.
