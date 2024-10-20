import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.webhook.create({
        data: {
            headers: '{"Content-Type":"application/json"}',
            method: 'POST',
            path: '/',
            body: '{"message":"Hello, world!"}'
        }
    })
      console.log(user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })