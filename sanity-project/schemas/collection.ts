export default {
    name: 'collection',
    type: 'document',
    title: 'Collections',
    fields: [
        {
            name: 'userId',
            type: 'number',
            title: 'User ID',
            readOnly: true
        },
        {
            name: 'name',
            type: 'string',
            title: 'Name'
        },
        {
            name: 'image',
            type: 'string',
            title: 'ImageURL'
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description'
        },
        {
            name: 'minPlayers',
            type: 'number',
            title: 'Minimum Players'
        },
        {
            name: 'maxPlayers',
            type: 'number',
            title: 'Maximum Players'
        },
        {
            name: 'playTime',
            type: 'number',
            title: 'Play Time'
        },
        {
            name: 'minAge',
            type: 'number',
            title: 'Minimum Age'
        },
        {
            name: 'categories',
            type: 'array',
            of: [
                {
                    type: 'string'
                }
            ],
            title: 'Categories'
        },
        {
            name: 'mechanics',
            type: 'array',
            of: [
                {
                    type: 'string'
                }
            ],
            title: 'Mechanics'
        }
    ]
}