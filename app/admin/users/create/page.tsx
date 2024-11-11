'use server'

import { CreateProvider } from "@/context/create";
import { Create } from "./create";
import { Role } from "./role";
import { Finish } from "./finish";
import { cookies } from "next/headers";

export default async function Page() {
  const token = cookies().get('jwt')?.value

  return (
    <CreateProvider>
      <div className='mt-9 grid grid-cols-2 gap-4'>
        <div className="flex flex-col gap-3">
          <Create token={token} />
          <Role token={token} />
          <Finish />
        </div>
        <div className="text-justify">
          <h1 className="text-center text-2xl">Em Obras...</h1>
        </div>
      </div>
    </CreateProvider>
  )
}
