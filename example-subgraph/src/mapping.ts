// yarn codegen command should generate these two files but I have an error when I run the command for now
import { DataChanged } from "../generated/UP/UP";
import { UP } from "../generated/UP";

export function handleUpdatedUP(event: DataChanged): void {
  let key = event.params.key.toHex();
  let data = UP.load(key);
  if (data == null) {
    data = new UP(key);
  }
  data.value = event.params.value;
}
