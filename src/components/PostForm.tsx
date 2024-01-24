import {useContext, useState} from "react"
import {collection, addDoc} from "firebase/firestore"
import {db} from "firebaseApp"
import AuthContext from "context/AuthContext"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"

export default function PostForm() {
    const [title, setTitle] = useState<string>("")
    const [summary, setSummary] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "posts"), {
                title: title,
                summary: summary,
                content: content,
                createAt: new Date()?.toLocaleDateString(),
                email: user?.email
            })

            toast.success("게시글을 생성하였습니다.")
            navigate("/")
        } catch (e: any) {
            console.log(e.error)
            toast.error("게시글을 생성하는데 실패하였습니다.")
        }
    }

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: {name, value},
        } = e;

        if(name == "title") {
            setTitle(value)
        }

        if(name == "summary") {
            setSummary(value)
        }

        if(name == "content") {
            setContent(value)
        }
    }
    return (
        <form onSubmit={onSubmit} className="form">
            <div className="form__block">
                <label htmlFor="title">제목</label>
                <input type="text" name="title" id="title" value={title} required onChange={onChange}/>
            </div>
            <div className="form__block">
                <label htmlFor="summary">요약</label>
                <input type="text" name="summary" id="summary" value={summary} required onChange={onChange} />
            </div>
            <div className="form__block">
                <label htmlFor="content">내용</label>
                <textarea name="content" id="content" value={content} required onChange={onChange} />
            </div>
            <div className="form__block">
                <input type="submit" value="제출" className="form__btn--submit"></input>
            </div>
        </form>
    )
}