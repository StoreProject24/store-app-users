import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface MultiSelectProps {
  options: { value: string; label: string }[];
  selected: string[];
  setSelected: (selected: string[]) => void;
}

function MultiSelect({ options, selected, setSelected }: Readonly<MultiSelectProps>) {
  const toggle = (val: string) =>
    selected.includes(val)
      ? setSelected(selected.filter(s => s !== val))
      : setSelected([...selected, val]);

  const selectedLabels = options.filter(opt => selected.includes(opt.value)).map(opt => opt.label);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full flex justify-between text-ellipsis overflow-hidden"
        >
          <span className="text-ellipsis overflow-hidden">
            {selectedLabels.length ? selectedLabels.join(', ') : 'Selecciona...'}
          </span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {options.map(o => (
          <DropdownMenuCheckboxItem
            key={o.value}
            checked={selected.includes(o.value)}
            onCheckedChange={() => toggle(o.value)}
            // onSelect={e => e.preventDefault()} // evita que se cierre
          >
            {o.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default MultiSelect;
