import { ReactNode } from "react";
import {
  SnackbarProvider,
  SnackbarOrigin,
  SnackbarProviderProps,
} from "notistack";

interface SystemMessagesProviderProps {
  children: ReactNode;
}

const SNACKBAR_CONFIG: Pick<SnackbarProviderProps, "maxSnack"> & {
  vertical: SnackbarOrigin["vertical"];
  horizontal: SnackbarOrigin["horizontal"];
} = {
  maxSnack: 10,
  vertical: "top",
  horizontal: "right",
};

export default function SystemMessagesProvider({
  children,
}: SystemMessagesProviderProps) {
  return (
    <SnackbarProvider
      {...SNACKBAR_CONFIG}
      anchorOrigin={{
        vertical: SNACKBAR_CONFIG.vertical,
        horizontal: SNACKBAR_CONFIG.horizontal,
      }}
    >
      {children}
    </SnackbarProvider>
  );
}
