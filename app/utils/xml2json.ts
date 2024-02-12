export default function xml2json(src: any) {
    let children = [...src.children];

    //console.log(src);

    if (!children.length) {
        return src.getAttribute('value');
    }

    let jsonResult = {}

    for (let child of children) {
        let childIsArray = children.filter(eachChild => eachChild.nodeName === child.nodeName).length > 1;

        if (childIsArray) {
            if (jsonResult[child.nodeName] === undefined) {
                if (child.getAttribute('id') !== null) {
                    jsonResult[(child.nodeName + " " +child.getAttribute('id'))] = [xml2json(child)]
                }
            } else {
                if (child.getAttribute('id') !== null) {
                    jsonResult[(child.nodeName + " " +child.getAttribute('id'))] = [xml2json(child)]
                }
            }
        } else {
            jsonResult[child.nodeName] = xml2json(child);
        }
    }

    return jsonResult;
}