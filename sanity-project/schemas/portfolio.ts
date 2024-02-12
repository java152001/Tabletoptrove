export default {
    name: 'portfolio',
    type: 'document',
    title: 'Portfolio',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title'
        },
        {
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [
                {
                    type: 'block'
                }
            ]
        }
    ]
}