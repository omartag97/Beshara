import { Link } from "react-router-dom";
import Typography from "../../ui/Typography";

export const Logo = () => (
  <Link
    to="/"
    aria-label="Go to home page"
    className="flex items-center space-x-1"
  >
    <Typography variant="h6" component="span" color="accent-foreground">
      Beshara
    </Typography>
    <Typography variant="h6" component="span" color="primary">
      store
    </Typography>
  </Link>
);
