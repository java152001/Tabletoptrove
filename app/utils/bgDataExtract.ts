export default function xml2jsonMeta(srcDOM: any) {

    let categories = [];
    let mechanics = [];
    const allCategories = srcDOM.getElementsByTagName('link')

    for (let i of allCategories) {

        if (i.getAttribute('type') === 'boardgamecategory') {
            categories.push(i.getAttribute('value'));
        } else if (i.getAttribute('type') === 'boardgamemechanic') {
            mechanics.push(i.getAttribute('value'));
        }
    };

    const jsonResult = {
        thumbnail: srcDOM.getElementsByTagName('thumbnail')[0].childNodes[0].nodeValue,
        image: srcDOM.getElementsByTagName('image')[0].childNodes[0].nodeValue,
        name: srcDOM.getElementsByTagName('name')[0].getAttribute('value'),
        description: srcDOM.getElementsByTagName('description')[0].childNodes[0].nodeValue,
        minPlayers: srcDOM.getElementsByTagName('minplayers')[0].getAttribute('value'),
        maxPlayers: srcDOM.getElementsByTagName('maxplayers')[0].getAttribute('value'),
        playTime: srcDOM.getElementsByTagName('playingtime')[0].getAttribute('value'),
        minAge: srcDOM.getElementsByTagName('minage')[0].getAttribute('value'),
        categories: categories,
        mechanics: mechanics
    }

    return jsonResult;
}