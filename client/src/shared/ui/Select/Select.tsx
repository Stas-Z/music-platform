import { memo, useCallback } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export interface SelectItem {
    value: string
    content: string
}

interface SelectProps {
    items?: SelectItem[]
    value?: string
    onChange: (value: string) => void
}

export const SelectVariants = memo(
    ({ items, value, onChange }: SelectProps) => {
        const handleChange = useCallback(
            (event: SelectChangeEvent) => {
                onChange(event.target.value)
            },
            [onChange],
        )

        return (
            <div>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">
                        Исполнитель
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={value}
                        onChange={handleChange}
                        label="Artist"
                    >
                        {items?.map((item) => (
                            <MenuItem key={item.value} value={item.value}>
                                {item.content}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        )
    },
)

SelectVariants.displayName = 'SelectVariants'
