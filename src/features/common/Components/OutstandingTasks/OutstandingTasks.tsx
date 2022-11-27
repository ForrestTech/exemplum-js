export const OutstandingTasks = () => (
  <div>
    <p className="font-medium dark:text-white">Still to do:</p>
    <ul className="dark:text-white">
      <li>Add unit tests for update due date</li>
      <li>Update error handlers to support failure</li>
      <li>
        Add aggregate function query example (count of tasks by priority level)
      </li>
      <li>
        Set tailwind color variables
        https://www.youtube.com/watch?v=T-Zv73yZ_QI&t=339s
      </li>
      <li>Use cva for my buttons react-cva</li>
      <li>
        CI/CD process
        https://github.com/trpc/examples-next-prisma-starter/blob/main/.github/workflows/main.yml
      </li>
      <li>
        Get preview working
        https://vercel.com/docs/concepts/git/vercel-for-github Pull request
        feedback
      </li>
      <li>
        PR features / commit guide lines
        https://www.conventionalcommits.org/en/v1.0.0/, vercel git
        https://vercel.com/docs/concepts/git/vercel-for-github changesets
        https://github.com/changesets/changesets/blob/main/docs/adding-a-changeset.md
      </li>
      <li>Migrate to Linear for task management</li>
      <li>Integrate Polly like retry for calling weather API</li>
      <li>
        Integrate the date picker (date format feature/ ability to set
        placeholder/does not have to have default date ){" "}
      </li>
      <li>
        Schedule Task Solution
        https://vercel.com/guides/how-to-setup-cron-jobs-on-vercel
      </li>
      <li>
        Domain events (some infrastructure for pushing events and subscribing)
      </li>
      <li>Ably integration</li>
      <li>Sanity CMS integration for blog posting</li>
      <li>
        Server side caching (as its serverless this would need to be a central
        redis style cache) Render possibly
      </li>
      <li>
        Explore more ts-fs options plus using either for update due date and
        exhaustive pattern matching replacement
      </li>
      <li>
        Add a wrapper around dates so no hard dependency on daysjs is taken ??
      </li>
      <li>
        Add attachment integrations, so we can upload file and have an example
        of file storage
      </li>
      <li>Growthbook integration</li>
      <li>Custom 404 style</li>
      <li>Try out codespaces</li>
      <li>Loading component add to table</li>
      <li>Add pagination to table component</li>
      <li>Add selection to table component</li>
      <li>Sanity content management integration</li>
      <li>Update to next13 and server components</li>
      <li>
        Get production working, dev working on DB branch with schema changes
        being deployed on deployment
      </li>
    </ul>
  </div>
);
