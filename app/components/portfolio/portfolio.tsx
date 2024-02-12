import React, { ReactNode } from 'react';
import styles from './page.module.css';
import { client } from '../../utils/configSanity'
import { PortableText } from '@portabletext/react';

interface IPortfolio {
    _id: string;
    title: string;
    description: any;
    _createdAt: string;
}

async function getData() {
    const query = '*[_type == "portfolio"]';

    const data = await client.fetch(query);

    return data as IPortfolio[];
}

const Portfolio = async () => {

    const data = (await getData()) as IPortfolio[];

    console.log(data);

    return (
        <div>
            <h1>Portfolio</h1>
            <div>
                {
                    data?.map((item) => {
                        return (
                            <div key={item?._id}>
                                <div>
                                    <span>{item?.title}</span>
                                </div>
                                <div>
                                    <PortableText value={item?.description} />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Portfolio;