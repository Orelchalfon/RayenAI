import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
type FormFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: string;
};
const FormField
    = <T extends FieldValues>({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="label">{label}</FormLabel>
                    <FormControl>
                        <Input
                            className="input"
                            type={type}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />)

export default FormField

