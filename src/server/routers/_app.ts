import { z } from 'zod';
import { procedure, router } from '../trpc';
import fs from 'fs';

const saveEditRequest = (data: EditRequestHandlerArg) => {
  const filePath = 'edit-requests.json';

  let json;
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    json = JSON.parse(fileContents);
  } catch {
    // if file doesn't exist or is empty
    json = { requests: [] };
  }

  json.requests.push(data.input);
  const updatedJson = JSON.stringify(json, null, 2);
  fs.writeFileSync(filePath, updatedJson);

  return { message: 'Edit Request saved. Stay tuned while we edit the image.' };
}

const health = router({
  healthz: procedure.query(() => 'yay!')
})

const photo = router({
  // editRequest: procedure
  //   // .input(
  //   //   z.object({
  //   //     image: z.string(),
  //   //     editDescription: z.string(),
  //   //   }),
  //   // )
  //   .mutation(saveEditRequest),
})

export const appRouter = router({
  health: health,
  editRequest: procedure
    .input(
      z.object({
        image: z.string(),
        editDescription: z.string(),
      }),
    )
    .mutation(saveEditRequest),
});
// export type definition of API
export type AppRouter = typeof appRouter;

console.log(appRouter)
