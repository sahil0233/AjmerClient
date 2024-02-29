import React, {useState, Fragment} from 'react';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]

const ModifyProduct = () => {

    const [selected, setSelected] = useState(people[0])
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [variations,setVariations] = useState("");
    const [price,setPrice] = useState("");
    const [discounted_price,setDiscounted_price] = useState("");
    const [tags,setTags] = useState([]);
    const [image,setImage] = useState("");
    const [voucher,setVoucher] = useState(null);
    const [brand,setBrand] = useState("");
    const [quantity,setQuantity] = useState("");
    const [visible,setVisible] = useState(true);

    const addTag = (e) => {
        if (e.key === "Enter") {
            if (e.target.value.length > 0) {
                setTags([...tags, e.target.value]);
                e.target.value = "";
            }
        }
    };

    const removeTag = (removedTag) => {
        const newTags = tags.filter(
            (tag) => tag !== removedTag
        );
        setTags(newTags);
    };

  return (
    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
        <div className="md:col-span-5">
            <label for="title">Title</label>
            <input type="text" name="title" id="title" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value={title} />
        </div>

        <div className="md:col-span-5">
            <label for="description">Description</label>
            <textarea type="text" name="description" id="description" className="border mt-1 rounded px-4 w-full bg-gray-50" value={description} placeholder="Product Description" rows={4} cols={50} />
        </div>

        <div className="md:col-span-3">
            <label for="category">Category</label>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                        <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                        }
                        value={person}
                        >
                        {({ selected }) => (
                            <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {person.name}
                            </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

        <div className="md:col-span-2">
            <label for="variations">Variations</label>
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selected.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                    </span>
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                        <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                            }`
                        }
                        value={person}
                        >
                        {({ selected }) => (
                            <>
                            <span
                                className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {person.name}
                            </span>
                            {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
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

        <div className="md:col-span-1">
            <label for="price">Price</label>
            <input type="text" name="price" id="price" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
        </div>

        <div className="md:col-span-1">
            <label for="discounted_price">Sale Price</label>
            <input type="text" name="discounted_price" id="discounted_price" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
        </div>

        <div className="md:col-span-1">
            <label for="brand">Brand</label>
            <input type="text" name="brand" id="brand" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
        </div>
        <div className="md:col-span-2 gap-4 grid grid-cols-3">
            <div className='col-span-1'>
                <label for="quantity">Quantity</label>
                <input type="number" name="quantity" id="quantity" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
            </div>
            <div className="md:col-span-2">
            <label for="Voucher">Voucher</label>
            <input type="text" name="voucher" id="voucher" className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50" placeholder="" value="" />
        </div>
        </div>

        <div className="md:col-span-5">
            <div className="inline-flex items-center">
            <input type="checkbox" name="visible" id="visible" className="form-checkbox" />
            <label for="visible" className="ml-2">Make the product visible on website</label>
            </div>
        </div>


        <div className='md:col-span-5'>
            <input
                className='w-full py-2.5 px-3 rounded-md mb-2 bg-white'
                placeholder="Enter text and click Enter to add"
                onKeyDown={addTag}
            />
            <div className='flex gap-2'>
                {tags?.map((Tag, index) => {
                    return (
                        <div key={index} className="flex bg-white   m-1 p-2 rounded-se-2xl rounded-es-2xl  ">
                            <span className='mt-1 bg-gray-400 px-2 py-1 rounded-xl'>{Tag}</span>
                            <XMarkIcon
                                onClick={() => removeTag(Tag)}
                                className='h-4 w-4 cursor-pointer' />
                        </div>
                    );
                })}
            </div>
        </div>

        <div className="md:col-span-2">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" multiple accept="image/*" />
        </div>

        <div className="md:col-span-5 text-right">
            <div className="inline-flex items-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
            </div>
        </div>

    </div>
  )
}

export default ModifyProduct
