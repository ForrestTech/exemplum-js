export const OutstandingTasks = () => (
  <div>
    <p className="font-medium dark:text-white">Still to do:</p>
    <ul className="dark:text-white">
      <li>
        End to end test
        https://github.com/trpc/examples-next-prisma-starter/blob/main/playwright/smoke.test.ts
        https://github.com/trpc/examples-next-prisma-starter/blob/main/.github/workflows/main.yml
      </li>
      <li>
        Set tailwind color variables
        https://www.youtube.com/watch?v=T-Zv73yZ_QI&t=339s
      </li>
      <li>
        CI/CD process
        https://github.com/trpc/examples-next-prisma-starter/blob/main/.github/workflows/main.yml
      </li>
      <li>Use cva for my buttons react-cva</li>
      <li>
        encapsulation of domain logic full stack (cant schedule a task due date
        for the same hour)
      </li>
      <li>
        Add aggregate function query example (count of tasks by priority level)
      </li>
      <li>collection helpers for typescript</li>
      <li>Server side logging</li>
      <li>Log rocket integration</li>
      <li>SQL error translation</li>
      <li>Database Transaction (nark multiple items as done)</li>
      <li>
        Server side caching (as its serverless this would need to be a central
        redis style cache)
      </li>
      <li>
        Integrate the date picker (date format feature/ ability to set
        placeholder/does not have to have default date ){" "}
      </li>
      <li>Sanity CMS integration for blog posting</li>
      <li>Explore more ts-fs options</li>
      <li>
        Domain events (some infrastructure for pushing events and subscribing)
      </li>
      <li>Add repeat task feature</li>
      <li>Ably integration</li>
      <li>
        Add attachment integrations, so we can upload file and have an example
        of file storage
      </li>
      <li>Unit tests</li>
      <li>Smoke tests</li>
      <li>Vercel analytics @vercel/analytics</li>
      <li>Growthbook integration</li>
      <li>Schedule Task Solution</li>
      <li>Try out codespaces</li>
      <li>SaaS messaging functions</li>
      <li>Integrate Polly</li>
      <li>Loading component add to table</li>
      <li>Add pagination to table component</li>
      <li>Add selection to table component</li>
      <li>Sanity content management integration</li>
      <li>Update to next13 and server components</li>
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
      <li>
        Get production working, dev working on DB branch with schema changes
        being deployed on deployment
      </li>
    </ul>
  </div>
);
