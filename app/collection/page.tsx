import { Title, Stack } from "@mantine/core";
import SearchForm from "./searchForm";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Collection() {

    type NewSession = {
        user: {
          email: string | null | undefined;
          id: number | null | undefined;
          name: string | null | undefined;
          image: string | null | undefined;
        }
      }
    
      const session = await getServerSession(options) as NewSession;

      console.log(session);

    return (
        <>
            <Stack>
                <Title order={1}>Create your Collection</Title>
                <SearchForm id={session.user.id ?? 0} />
            </Stack>
        </>
    )
}