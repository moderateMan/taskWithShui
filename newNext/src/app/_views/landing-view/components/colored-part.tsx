import { Container } from "@mui/material";
import { CSSProperties, PropsWithChildren, useMemo } from "react";

export const ColoredPart = (props: PropsWithChildren<{ mdUp: boolean, style?: CSSProperties }>) => {
    const marginStyle = useMemo(() => ({
        paddingTop: props.mdUp ? "120px" : "56px",
        paddingBottom: props.mdUp ? "120px" : "56px",
    }), [props.mdUp]);

    return <div style={{ backgroundColor: '#14417D', width: "100%", ...props.style }}>
        <Container sx={marginStyle}>
            {props.children}
        </Container>
    </div>;
};