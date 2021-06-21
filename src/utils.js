
export const redirect = path => {
    const { protocol, host } = window.location
    window.location.assign(`${protocol}//${host}${path}`)
}

export const ravelTree = questions => {
    let root = questions.filter(q => q.root)[0]
    function ravelBranch(root) {
        if(root) {
            console.log(root)
            for(let i = 0; i < root.next.length; i++) {
                if(!root.next[i].name) {
                    next = questions.filter(q => q._id === root.next[i])[0]
                    if(!next) {
                        continue
                    }
                    root.next[i] = next
                }
                if(root.next[i]) {
                    root.next[i] = ravelBranch(root.next[i])
                }
            }
            return root
        }
        return {}
    }

    return ravelBranch(root)
}


export const shorten = (text, max) => {
    if(text.length > max) {
        return text.substring(0, max - 3) + "..."
    }
    return text
}