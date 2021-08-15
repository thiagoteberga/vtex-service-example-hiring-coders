import { json } from 'co-body'
import { UserInputError } from '@vtex/api'

export async function statusPost(ctx: Context, next: () => Promise<any>) {

  const body = (await json(ctx.req) as { code: number})

  if (!body?.code){
    throw new UserInputError('Please suply the code')
  }


  const { code } = body

  const res = await ctx.clients.status.getStatus(code).catch((reason) => {
    return reason?.response?.data
  })

  console.log(res)
  ctx.set('Cache-Control','no-cache no-store') //Evitar que o Endpoint Utilize Cache
  ctx.body = res
  ctx.status = code

  await next()
}