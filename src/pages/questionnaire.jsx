import React, { Fragment, useEffect, useState, useMemo } from "react"
import Link from "next/link"
import { Listbox, Transition, Disclosure} from "@headlessui/react"

import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import { shorten, treeFactory } from "../utils"
import Secure from "../components/secure"
import Shell from "../components/shell"
import QuestionnaireTree from "../visualisations/questionnaireTree"
import TextInput from "../components/textInput"
import { useDispatch } from "react-redux"
import { useQuestionnaire } from "../hooks"

import {
    addCondition,
    addQuestion, 
    deleteCondition, 
    deleteQuestion,
    updateQuestion,
    addOption,
    insertQuestion,
    deleteOption
} from "../actions"

const categories = {
    number: { id: 1, name: "Ziffern", key: "number" },
    radio: { id: 2, name: "Auswahl", key: "radio" },
    string: {id: 3, name: "Zeichenkette", key: "string" },
    bool: { id: 4, name: "Bool'sche Auswahl", key: "bool" }
}

const conditionTypes = [
    "eq",
    "gt",
    "lt",
    "true",
    "false"
]

const QuestionnaireDashboard = () => {
    let dispatch = useDispatch()
    let questionnaire = useQuestionnaire()

    let [title, setRadioTitle] = useState("")
    let [radioValue, setRadioValue] = useState("")

    let [newName, setNewName] = useState("")
    let [newType, setNewType] = useState(categories["number"])

    let [questionId, setQuestionId] = useState(questionnaire.find(q => q.root)?._id)

    let newCondition = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addCondition(question._id, {
            type,
            value: conditionValue
        }))
    }

    let newOption = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addOption(question._id, {
            title,
            value : radioValue
        }))
        setRadioTitle("")
        setRadioValue("")
    }

    let removeOption = id => e => {
        e.preventDefault()
        e.stopPropagation()
        debugger;
        dispatch(deleteOption(question._id, id))
    }

    let removeCondition = (qid, cid) => e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteCondition(question._id, qid, cid))
    }

    let createQuestion = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addQuestion(question._id, {
            name: newName,
            type: newType.key
        }))
    }

    let insertNewQuestion = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(insertQuestion(question._id, {
            name: newName,
            type: newType.key
        }))
    }

    let appendQuestion = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addQuestion(question._id, {
            _id: existingQuestion._id
        }))
    }

    let question = questionnaire.find(q => q._id === questionId) || {
        name: "",
        condition: [],
        options: [],
        next: [],
        type: "",
        _id: "",
        root: true
    }

    let category = categories[question.type || "number"]

    useEffect(() => {
        setQuestionId(questionnaire.find(q => q.root)?._id)
    }, [questionnaire])

    let tree = useMemo(() => treeFactory(questionnaire), [questionnaire])
    let [ existingQuestion, setExistingQuestion ] = useState(questionnaire[0])
    let nextQuestions = question.next
        .map(({_id, condition}) => ({
            question: questionnaire.find(q => q._id === _id),
            condition
        }))


    const onClickDeleteQuestion = _id => e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(deleteQuestion(question._id, _id))
    } 

    const onClickOpenQuestion = _id => e => {
        e.preventDefault()
        e.stopPropagation()
        setQuestionId(_id)
    }

    let [conditionType, setConditionType] = useState(conditionTypes[0])
    let [conditionValue, setConditionValue] = useState("")

    const appendCondition = (qid, nid) => e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addCondition(qid, nid, {
            type: conditionType,
            value: conditionValue
        }))
    }

    return (
        <Shell>
            <div className="grid grid-cols-2 xl:grid-cols-3 w-full h-full">
                <main style={{
                    backgroundSize: "20px 20px",
                    backgroundImage: "radial-gradient(circle, #aaa 1px, rgba(180, 180, 180, 0) 1px)"
                }} className="bg-gray-200 xl:col-span-2">
                    <QuestionnaireTree data={tree} selectNode={q => setQuestionId(q._id)} active={question._id}/>
                </main>
                <aside className="bg-gray-100 border-l border-gray-300 p-3 xl:p-5 2xl:p-8 overflow-y-scroll pb-10">
                    <div className="flex flex-col h-full space-y-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="mb-1">
                                <h2 className="text-2xl font-semibold" title={question?.name}>{shorten(question?.name, 20)}</h2>
                                <span className="text-sm text-gray-500">{question?._id}</span>
                            </div>
                            {
                                question.root ?
                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Wurzel
                                </span>
                                :
                                null
                            }
                        </div>
                        <div>
                            <div>
                                <label className="text-xs uppercase text-gray-600 tracking-wide" htmlFor="category">Art</label>
                                <Listbox value={category} onChange={c => dispatch(updateQuestion({...question, type: c.key}))} >
                                    <div className="w-full relative">
                                        <Listbox.Button id="category" className="relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
                                            <span className="block truncate">{category.name}</span>
                                            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <SelectorIcon
                                                    className="w-5 h-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-in duration-75"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                {Object.values(categories).map(c => (
                                                    <Listbox.Option
                                                        key={c.id}
                                                        className={({ active }) =>
                                                            `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                                                                cursor-default select-none relative py-2 pl-10 pr-4`
                                                        }
                                                        value={c}
                                                    >
                                                        {({ selected, active }) => (
                                                            <>
                                                            <span
                                                                className={`${
                                                                selected ? 'font-medium' : 'font-normal'
                                                                } block truncate`}
                                                            >
                                                                {c.name}
                                                            </span>
                                                            {selected ? (
                                                                <span
                                                                className={`${
                                                                    active ? 'text-blue-600' : 'text-blue-600'
                                                                }
                                                                        absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                >
                                                                    <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                </span>
                                                            ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div>
                                <TextInput label={"Titel"} value={question?.name} onChange={name => updateQuestion({name})} />
                            </div>
                        </div>
                        { category.key === "radio" &&
                            <>
                                <hr/>
                                <div>
                                    <h2 className="text-lg font-semibold mb-1">Auswahl</h2>
                                    <div className="mb-2 overflow-x-auto">
                                        <div className="py-2 align-middle inline-block min-w-full">
                                            <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Titel
                                                            </th>
                                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Wert
                                                            </th>
                                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                <span className="sr-only"></span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {question.options.map((k, i) => (
                                                            <tr key={i}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {k.title}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {k.value}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button onClick={removeOption(k._id)} className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                        Löschen
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <TextInput value={title} label="Titel" onChange={v => setRadioTitle(v)}/>
                                <TextInput value={radioValue} label="Wert" onChange={v => setRadioValue(v)}/>
                                <div className="mt-5">
                                    <button 
                                        onClick={newOption}
                                        className="py-2 px-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right">
                                        Option hinzufügen
                                    </button>
                                </div>
                            </>
                        }
                        <hr/>
                        <div>
                            <label className="text-lg font-semibold mb-1" htmlFor="category">Folgefragen</label>
                            {nextQuestions.map(({question: q, condition}) => (
                                <Disclosure as="div" className="w-full py-2">
                                    <Disclosure.Button className="w-full rounded-lg bg-white text-left px-4 py-3">
                                        <div className="flex flex-row justify-between items-center">
                                            <div>
                                                {q?.name} &#8226; <span className="text-gray-500">{q?.type}</span>
                                            </div>
                                            <div>
                                                <button onClick={onClickOpenQuestion(q?._id)} className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </button>
                                                <button onClick={onClickDeleteQuestion(q?._id)} className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="p-3">
                                        <div className="mb-2">
                                            <div className="py-2 align-middle inline-block min-w-full">
                                                <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-gray-200">
                                                        <thead className="bg-gray-50">
                                                            <tr>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Bedingungen
                                                                </th>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    Wert
                                                                </th>
                                                                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                    <span className="sr-only">Löschen</span>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="bg-white divide-y divide-gray-200">
                                                            {condition?.map((c, i) => (
                                                                <tr key={i}>
                                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                                        {c?.type}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap" title={c?.value}>
                                                                        {shorten(c?.value, 16)}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                        <button onClick={removeCondition(q?._id, c?._id)} className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                            </svg>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                            <form className="p-2">
                                                <div className="grid lg:grid-cols-2 gap-1 w-full overflow-visible">
                                                    <div>
                                                        <TextInput label={"Wert"} value={conditionValue} onChange={name => setConditionValue(name)} />
                                                    </div>
                                                    <div>
                                                        <label className="text-xs uppercase text-gray-600 tracking-wide" htmlFor="category">Bedingung</label>

                                                        <Listbox value={category} onChange={c => setConditionType(c)} >
                                                            <div className="w-full relative">
                                                                <Listbox.Button id="category" className="mt-1 relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
                                                                    <span className="block truncate">{conditionType}</span>
                                                                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                                        <SelectorIcon
                                                                            className="w-5 h-5 text-gray-400"
                                                                            aria-hidden="true"
                                                                        />
                                                                    </span>
                                                                </Listbox.Button>
                                                                <Transition
                                                                    as={Fragment}
                                                                    enter="transition ease-in duration-75"
                                                                    leave="transition ease-in duration-150"
                                                                    leaveFrom="opacity-100"
                                                                    leaveTo="opacity-0"
                                                                >
                                                                    <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                                        {conditionTypes.map((c, i) => (
                                                                            <Listbox.Option
                                                                                key={i}
                                                                                className={({ active }) =>
                                                                                    `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                                                                                        cursor-default select-none relative py-2 pl-10 pr-4`
                                                                                }
                                                                                value={c}
                                                                            >
                                                                                {({ selected, active }) => (
                                                                                    <>
                                                                                    <span
                                                                                        className={`${
                                                                                        selected ? 'font-medium' : 'font-normal'
                                                                                        } block truncate`}
                                                                                    >
                                                                                        {c}
                                                                                    </span>
                                                                                    {selected ? (
                                                                                        <span
                                                                                        className={`${
                                                                                            active ? 'text-blue-600' : 'text-blue-600'
                                                                                        }
                                                                                                absolute inset-y-0 left-0 flex items-center pl-3`}
                                                                                        >
                                                                                            <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                                                        </span>
                                                                                    ) : null}
                                                                                    </>
                                                                                )}
                                                                            </Listbox.Option>
                                                                        ))}
                                                                    </Listbox.Options>
                                                                </Transition>
                                                            </div>
                                                        </Listbox>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={appendCondition(question._id, q?._id)}
                                                    type="submit" 
                                                    className="py-2 px-3 mb-5 mt-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                                    >
                                                    Bedingung hinzufügen
                                                </button>
                                            </form>
                                        </div>
                                    </Disclosure.Panel>
                                </Disclosure>
                            ))}
                        </div>
                        <hr />
                        <div>
                            <h4 className="text-base font-semibold mb-1 text-gray-600">Bestehende Frage</h4>
                            <label className="text-xs text-gray-600 uppercase" htmlFor="category">Frage</label>
                            
                            <Listbox value={existingQuestion} onChange={q => setExistingQuestion(q)}>
                                <div className="w-full relative">
                                    <Listbox.Button id="category" className="relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
                                        <span className="block truncate">{existingQuestion?.name || "Frage"}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon
                                                className="w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-in duration-75"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {questionnaire
                                                .filter(q => q._id !== question._id)
                                                .map(q => (
                                                <Listbox.Option
                                                    key={q._id}
                                                    className={({ active }) =>
                                                        `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={q}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                        <span
                                                            className={`${
                                                            selected ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {q.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                            className={`${
                                                                active ? 'text-blue-600' : 'text-blue-600'
                                                            }
                                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                            >
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                        </div>
                        <div>
                            <button
                                onClick={appendQuestion}
                                type="submit" 
                                className="py-2 px-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                >
                                Frage hinzufügen
                            </button>
                        </div>
                        <div>
                            <h4 className="text-base font-semibold mb-1 text-gray-600">Neue Frage</h4>
                            <label className="text-xs text-gray-600 uppercase" htmlFor="category">Art</label>
                            <Listbox value={newType} onChange={type => setNewType(type)}>
                                <div className="w-full relative">
                                    <Listbox.Button id="category" className="relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
                                        <span className="block truncate">{newType.name}</span>
                                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                            <SelectorIcon
                                                className="w-5 h-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </Listbox.Button>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-in duration-75"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                            {Object.values(categories).map(c => (
                                                <Listbox.Option
                                                    key={c.id}
                                                    className={({ active }) =>
                                                        `${active ? 'text-blue-900 bg-blue-100' : 'text-gray-900'}
                                                            cursor-default select-none relative py-2 pl-10 pr-4`
                                                    }
                                                    value={c}
                                                >
                                                    {({ selected, active }) => (
                                                        <>
                                                        <span
                                                            className={`${
                                                            selected ? 'font-medium' : 'font-normal'
                                                            } block truncate`}
                                                        >
                                                            {c.name}
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                            className={`${
                                                                active ? 'text-blue-600' : 'text-blue-600'
                                                            }
                                                                    absolute inset-y-0 left-0 flex items-center pl-3`}
                                                            >
                                                                <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                        </>
                                                    )}
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </Listbox>
                            <div>
                                <TextInput label={"Titel"} value={newName} onChange={name => setNewName(name)} />
                            </div>

                        </div>
                        <div>
                            <button
                                onClick={createQuestion}
                                type="submit" 
                                className="py-2 px-3 flex flex-row items-center rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Frage anfügen</span>
                            </button>
                            <button
                                onClick={insertNewQuestion}
                                type="submit" 
                                className="py-2 px-3 flex flex-row items-center mx-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Frage einfügen</span>
                            </button>
                        </div>
                    </div>
                </aside>
            </div>
        </Shell>
    )
}

export default function SecureQuestionnaireDashboard() {
    return (
        <Secure>
            <QuestionnaireDashboard />
        </Secure>
    )
}
