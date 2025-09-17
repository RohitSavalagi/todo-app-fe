import { Component, EventEmitter, forwardRef, Input, Output } from "@angular/core";
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.component.html',
  styleUrl: 'checkbox.component.less',
  imports: [
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  isDisabled: boolean = false;
  private onChange: (value: boolean) => void = () => {};
  private onTouched: () => void = () => {};

  @Input()
  public value: boolean = false;

  @Input()
  public label!: string;

  @Output()
  public valueChange = new EventEmitter<boolean>();

  writeValue(obj: any): void {
    this.value = !!obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  // Call this method from your template when checkbox value changes
  onCheckboxChange(event: { checked: boolean }): void {
    console.log(event);
    this.value = event.checked;
    this.onChange(this.value);
    this.onTouched();
    this.valueChange.emit(event?.checked);
  }
}
