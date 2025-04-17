import { LoaderIcon } from "lucide-react";

function Loader() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoaderIcon className="animate-spin" />
    </div>
  );
}

export default Loader;
