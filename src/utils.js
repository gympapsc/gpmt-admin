
export const redirect = path => {
    const { protocol, host } = window.location
    window.location.assign(`${protocol}//${host}${path}`)
}

export const treeFactory = questionnaire => {
    let root = questionnaire.find(q => q.root)
    if(!root) {
        return {}
    }

    function branch(question) {
        for(let i = 0; i < question.next.length; i++) {
            if(!question.next[i].name) {
                next = questionnaire.find(q => q._id === question.next[i]._id && q._id !== question._id)
                if(!next) {
                    // reference to question not found
                    continue
                }
                next.condition = question.next[i].condition
                question.next[i] = next
            }

            if(question.next[i]) {
                next = questionnaire.find(q => q._id === question.next[i]._id)
                question.next[i] = branch(next)
            }
        }
        return question
    }

    return branch(root)
}

export const ravelTree = questions => {
    let root = questions.filter(q => q.root)[0]
    console.log("RAVEL TREE", questions)
    function ravelBranch(root) {
        if(root) {
            console.log(root)
            for(let i = 0; i < root.next.length; i++) {
                if(!root?.next[i]?.name) {
                    next = questions.filter(q => q._id === root.next[i])[0]
                    if(!next) {
                        continue
                    }
                    root.next[i] = next
                }

                if(root.next[i]) {
                    next = questions.filter(q => q._id === root.next[i]._id)[0]
                    root.next[i] = ravelBranch(next)
                }
            }
            return root
        }
        return {}
    }

    return ravelBranch(root)
}


export const shorten = (text, max) => {
    if(text && text?.length > max) {
        return text.substring(0, max - 3) + "..."
    }
    return text
}