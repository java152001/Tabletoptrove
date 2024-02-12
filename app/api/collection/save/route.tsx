import { NextResponse } from "next/server";
import axios from 'axios';
require('dotenv').config();

export async function POST(req: Request) {
    const { bgData, id } = await req.json();
    const { name, image, description, minPlayers, maxPlayers, playTime, minAge, categories, mechanics } = bgData;

    const mutations = [
        {
            create: {
                _type: 'collection',
                userId: id,
                name,
                image,
                description,
                minPlayers,
                maxPlayers,
                playTime,
                minAge,
                categories,
                mechanics
            }
        }
    ]

    const sanityUrl = `https://${process.env.SANITY_PROJ_ID}.api.sanity.io/${process.env.SANITY_VERSION}/data/mutate/${process.env.SANITY_DATASET}`;

    const sanityRes = await axios({
        url: sanityUrl,
        method: 'post',
        headers: {
            Authorization: `Bearer ${process.env.SANITY_API_KEY}`
        },
        data: { mutations }
    })

    return NextResponse.json({ message: 'Game added to collection' });
}