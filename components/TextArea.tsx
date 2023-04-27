import styles from './TextArea.module.css'

export default function TextArea()
{

    return (
        <span className="textarea p-2 rounded-xl bg-white text-black w-full outline-none overflow-hidden" role="textbox" contentEditable></span>

    )
}