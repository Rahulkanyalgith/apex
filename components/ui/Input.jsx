export const Input = ({ labelValue, minLength, maxLength, type, placeholder, value, className, onChange, disabled, required, name, checked, list, ...props }) => {
    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={labelValue} className="text-sm font-medium text-black">{labelValue}</label>
            <input
                name={name}
                list={list}
                minLength={minLength}
                maxLength={maxLength}
                id={labelValue}
                type={type}
                placeholder={placeholder}
                value={value}
                className={`border border-black focus:outline-none p-2 md:p-3 lg:w-full bg-transparent sm:w-[450px] ${className}`}
                onChange={onChange}
                required={required}
                disabled={disabled}
                checked={checked}
            />
        </div>
    )
}