import { client } from "@/app/utils/configSanity";

interface ICollection {
    _id: string;
    name: string;
    minPlayers: number;
    maxPlayers: number;
    playTime: number;
    minAge: number;
    image: string;
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    const query: string = `*[_type == "collection" && userId == ${id}]{_id, image, name, minPlayers, maxPlayers, playTime, minAge}`;

    const data = await client.fetch(query, undefined, { cache: 'no-store' });

    return Response.json({ data: data as ICollection[]});
}