import React, { Fragment, useState } from "react"
import Link from "next/link"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import { ravelTree, shorten } from "../utils"
import Secure from "../components/secure"
import Shell from "../components/shell"
import QuestionnaireTree from "../visualisations/questionnaireTree"
import TextInput from "../components/textInput"
import { useDispatch } from "react-redux"
import { useQuestionnaire } from "../hooks"

import {
    addCondition,
    addQuestion, deleteQuestion
} from "../actions"
import e from "cors"

const categories = {
    number: { id: 1, name: "Ziffern", key: "number"},
    radio: { id: 2, name: "Auswahl", key: "radio"},
    string: {id: 3, name: "Zeichenkette", key: "string"},
    bool: { id: 4, name: "Bool'sche Auswahl", key: "book"}
}

const conditionTypes = [
    "eq",
    "gt",
    "lt"
]

const QuestionnaireDashboard = () => {
    let dispatch = useDispatch()
    let questionnaire = useQuestionnaire()

    let [category, setCategory] = useState(categories["number"])
    
    let [type, setType] = useState(conditionTypes[0])
    let [conditionValue, setConditionValue] = useState("")


    let [newName, setNewName] = useState("")
    let [newType, setNewType] = useState(categories["number"])

    let [questionId, setQuestionId] = useState(questionnaire.find(q => q.root)?._id)

    let updateQuestion = update => {
        setQuestion({
            ...question,
            ...update
        })
    }

    let newCondition = e => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(addCondition(question._id, {
            type,
            value: conditionValue
        }))
    }

    let createQuestion = e => {
        dispatch(addQuestion(question._id, {
            name: newName,
            type: newType.key
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

    return (
        <Shell>
            <div className="grid grid-cols-2 xl:grid-cols-3 w-full h-full">
                <main className="bg-gray-300 xl:col-span-2">
                    <QuestionnaireTree data={ravelTree(questionnaire)} selectNode={q => setQuestionId(q._id)}/>
                </main>
                <aside className="bg-gray-100 border-l border-gray-300 p-3 xl:p-5 2xl:p-8">
                    <form className="flex flex-col h-full space-y-4">
                        <div className="flex flex-row justify-between items-center">
                            <div className="mb-1">
                                <h2 className="text-2xl font-semibold">{question?.name}</h2>
                                <span className="text-sm text-gray-500">{question?._id}</span>
                            </div>
                            {
                                question.root ?
                                <span className="px-2 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Wurzel
                                </span>
                                :
                                <button onClick={e => dispatch(deleteQuestion(question._id))} disabled={question.root} title="Frage und alle Folgefragen löschen" className="text-red-700 p-2 rounded-lg hover:bg-red-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            }
                        </div>
                        <div>
                            <div>
                                <label className="text-sm text-gray-600" htmlFor="category">Art</label>
                                <Listbox value={category} onChange={setCategory}>
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
                                    <div className="mb-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                            <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                    <thead className="bg-gray-50">
                                                        <tr>
                                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                Option
                                                            </th>
                                                            <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                <span className="sr-only"></span>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="bg-white divide-y divide-gray-200">
                                                        {Object.keys(question.condition).map((k, i) => (
                                                            <tr key={i}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {k}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <Link href={`/app`}>
                                                                        <a className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                            Löschen
                                                                        </a>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                            </>
                        }
                        <hr/>
                        {
                            question.root || 
                            <>
                                <div>
                                    <h2 className="text-lg font-semibold mb-1">Bedingungen</h2>
                                    <div className="mb-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                                                        {question.condition.map((c, i) => (
                                                            <tr key={i}>
                                                                <td className="px-6 py-4 whitespace-nowrap">
                                                                    {c.type}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap" title={c.value}>
                                                                    {shorten(c.value, 14)}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
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
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-sm text-gray-600" htmlFor="type">Bedingung</label>
                                        <Listbox value={type} onChange={setType}>
                                            <div className="w-full relative">
                                                <Listbox.Button id="type" className="relative color transition ease-in-out duration-200 border border-gray-300  w-full py-2 md:py-3 pl-3 pr-10 text-left bg-white rounded-lg  cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 text-sm md:text-base">
                                                    <span className="block truncate">{type}</span>
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
                                                    <Listbox.Options className="z-50 absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-md max-h-72 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
                                        <TextInput value={conditionValue} label="Wert" onChange={v => setConditionValue(v)}/>
                                    </div>
                                    <div className="mt-5">
                                        <input 
                                            onClick={newCondition}
                                            type="submit" 
                                            className="py-2 px-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                            value="Bedingung hinzufügen"/>
                                    </div>
                                </div>
                                <hr/>
                            </>
                        }
                        <div>
                            <label className="text-lg font-semibold mb-1" htmlFor="category">Folgefragen</label>
                            <div className="rounded-md bg-white h-52 border border-gray-300 my-3"></div>
                            <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                    <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Frage
                                                    </th>
                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Art
                                                    </th>
                                                    <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        <span className="sr-only">Bearbeiten</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">

                                                {question.next.map((e, i) => (
                                                    <tr key={i}>
                                                        <td className="px-6 py-4 whitespace-nowrap" title={e.name}>
                                                            {shorten(e.name, 16)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {e.type}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                            <button onClick={event => {
                                                                event.stopPropagation()
                                                                event.preventDefault()
                                                                setQuestionId(e._id)
                                                            }} className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                                </svg>
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
                        <div>
                            <label className="text-sm text-gray-600" htmlFor="category">Art</label>
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
                                className="py-2 px-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                >
                                Frage hinzufügen
                            </button>
                        </div>
                    </form>
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
