import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from 'lucide-react'

interface DropdownProps {
    label: string;
    options: string[];
    selected: string;
    onSelect: (value: string) => void;
}

export default function Example({ label, options, selected, onSelect }: DropdownProps) {
    return (
        <Menu as="div" className="relative inline-block w-full">
            <MenuButton className="inline-flex w-full justify-between rounded-md bg-white px-3 py-2 text-sm font-inter shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50">
                {selected || label}
                <ChevronDownIcon aria-hidden="true" className="size-5 text-gray-400 " />
            </MenuButton>

            <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in max-h-60 overflow-y-auto"
            >
                <div className="py-1">
                    {options.map((option) => (
                        <MenuItem key={option}>
                            {({ active }) => (
                                <button
                                    type="button"
                                    onClick={() => onSelect(option)}
                                    className={`block w-full px-4 py-2 text-left text-sm text-gray-700 ${
                                        active ? 'bg-gray-100 text-gray-900' : ''
                                    }`}
                                >
                                    {option}
                                </button>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}
