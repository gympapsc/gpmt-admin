import React, { Fragment, useState } from "react"
import { Listbox, Switch, Transition } from "@headlessui/react"
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid"

import Secure from "../components/secure"
import Shell from "../components/shell"
import QuestionnaireTree from "../visualisations/questionnaireTree"
import TextInput from "../components/textInput"

const categories = {
    numeric: { id: 1, name: "Ziffern"},
    radio: { id: 2, name: "Auswahl"},
    string: {id: 3, name: "Zeichenkette"},
    bool: { id: 4, name: "Boolsche Auswahl"}
}

const QuestionnaireDashboard = () => {
    let [category, setCategory] = useState(categories["numeric"])
    let [title, setTitle] = useState("")


    return (
        <Secure>
            <Shell>
                <div className="grid grid-cols-2 lg:grid-cols-3 w-full h-full">
                    <main className="bg-gray-300 lg:col-span-2">
                        <QuestionnaireTree />
                    </main>
                    <aside className="bg-gray-100 border-l border-gray-300 p-3 xl:p-5 2xl:p-8">
                        <form className="flex flex-col h-full space-y-4">
                            <h2 className="text-lg font-semibold mb-3">Fragentitel</h2>
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
                                <TextInput label={"Titel"} value={title} onChange={setTitle} />
                            </div>
                            <hr/>
                            <div>
                                <label className="text-sm text-gray-600" htmlFor="category">Folgefragen</label>
                                <div className="rounded-md bg-white h-52 border border-gray-300 my-3"></div>
                                <div className="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                        <div className="border overflow-hidden border-gray-200 sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Bedingung
                                                        </th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                            Frage
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white divide-y divide-gray-200">

                                                    {/* {entries.map((e, i) => (
                                                        <tr key={i}>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {WEEKDAY[e?.date.getDay()]}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap">
                                                                {e?.date.getHours()}:{e?.date.getMinutes()}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <Link href={`/app/${e.type}/${e._id}`}>
                                                                    <a className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                        Bearbeiten
                                                                    </a>
                                                                </Link>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <Link href={`/app/${e.type}/${e._id}`}>
                                                                    <a className="text-indigo-600 p-2 hover:bg-indigo-100 rounded-lg transition-colors ease-in-out duration-100">
                                                                        Löschen
                                                                    </a>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))} */}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            <div className="">
                                <input 
                                    type="submit" 
                                    className="py-2 px-3 rounded-md bg-blue-600 text-white focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 focus:outline-none focus:ring-offset-gray-100 float-right"
                                    value="Speichern"/>
                            </div>
                        </form>
                    </aside>
                </div>
            </Shell>
        </Secure>
    )
}

export default QuestionnaireDashboard