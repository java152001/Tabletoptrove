import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Form from './form';

export default async function RegisterPage({
    searchParams
}: { searchParams: { [key: string]: string | string[] | undefined }}) {
    const session = await getServerSession();

    console.log(searchParams);

    // if (session) {
    //     redirect('/');
    // };

    return (
        <Form method={searchParams.method}/>
    )
}