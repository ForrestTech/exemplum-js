import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const seed = await prisma.todoList.upsert({
    where: { title: "Shopping" },
    update: {},
    create: {
      title: "Shopping",
      color: "#10B981",
      items: {
        create: [
          {
            title: "Milk",
          },
          {
            title: "Bread",
          },
        ],
      },
    },
  });

  console.log(seed);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
