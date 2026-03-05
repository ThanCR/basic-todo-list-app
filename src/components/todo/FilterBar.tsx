import { Search } from "lucide-react"
import { InputGroup, InputGroupInput, InputGroupAddon } from "../ui/input-group"

interface Props{
  setSearchText: React.Dispatch<React.SetStateAction<string>>,
  searchText: string,
  amount: number
}

export const FilterBar = ({ setSearchText, searchText, amount}: Props) => {

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value)
  }

  return (
    <InputGroup className="relative top-0 ">
      <InputGroupInput 
        placeholder="Search for a task" 
        value={searchText}
        onChange={handleSearch} 
        className="text-white placeholder:text-white"/>
      <InputGroupAddon>
        <Search className="text-white"/>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">{amount > 0 && searchText.length > 0 ? `${amount} results` : ''}</InputGroupAddon>
    </InputGroup>
  )
}
