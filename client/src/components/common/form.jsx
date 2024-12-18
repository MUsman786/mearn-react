import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue,SelectItem } from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function CommonForm({formControls,isFormValidate,formData,setFormData,onSubmit,buttonText}) {
  function renderInputComponentType(getControlItem){
    // debugger
    let element =null;
    const value  = formData[getControlItem.name] || ''
    switch (getControlItem.componentType) {
      case 'input':
        element = (<Input
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        id={getControlItem.name}
        type={getControlItem.type}
        value={value}
        onChange={event=>setFormData({
          ...formData,
          [getControlItem.name]: event.target.value
        })}
        />)
        break;
        case 'select':
          element = (
            <Select value={value}  onValueChange={value=>setFormData({
              ...formData,
              [getControlItem.name]: value
            })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={getControlItem.label}/>
              </SelectTrigger>
              <SelectContent>
                {/* {console.log(getControlItem.options)} */}
                {getControlItem.options && getControlItem.options.length>0?
                getControlItem.options.map(itemOption=><SelectItem key={itemOption.id} value={itemOption.id}>
                  {itemOption.label}
                </SelectItem>):null}
              </SelectContent>
            </Select>
          )
          break;
          case 'textarea':
            element = (<Textarea
              name={getControlItem.name}
              placeholder={getControlItem.placeholder}
              id={getControlItem.name}
              value={value}
              onChange={event=>setFormData({
                ...formData,
                [getControlItem.name]: event.target.value
              })}
            ></Textarea>)
            break;
            default:
              element = (<Input
                name={getControlItem.name}
                placeholder={getControlItem.placeholder}
                id={getControlItem.name}
                type={getControlItem.type}
                value={value}
                onChange={event=>setFormData({
                  ...formData,
                  [getControlItem.name]: event.target.value
                })}
                />)
    }
    return element
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gab-3">
        {
          formControls.map(controlItem => ( <div className="grid w-full gap-1.5" key={controlItem.name}>
              <label className="mt-3">{controlItem.label}</label>
              {
                renderInputComponentType(controlItem)
              }
            </div>
          ))
        }

        
      </div>
      <Button className="mt-3 w-full" type="submit" disabled={isFormValidate}>{buttonText || 'Submit'}</Button>
    </form>
  )
}
