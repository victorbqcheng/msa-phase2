import { CircularProgress, IconButton, Tooltip } from "@mui/material"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

type GenerateTitleButtonProps = {
    isThinking?: boolean;
    onClick?: () => void;
};

const GenerateTitleButton = ({ isThinking, onClick }: GenerateTitleButtonProps) => {

    return (
        <>
            {
                isThinking ? <CircularProgress size={20} /> : (
                    <Tooltip title="Generate Title">
                        <IconButton onClick={onClick}>
                            <AutoAwesomeIcon />
                        </IconButton>
                    </Tooltip>
                )

            }
        </>
    )
}

export default GenerateTitleButton