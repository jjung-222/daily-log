import { Link } from "react-router-dom";

export default function PostDetail() {
    return <>
        <div className="post__detail">
            <div className="post__box">
                <div className="post__title">title</div>
                <div className="post__profile-box">
                    <div className="post__profile"></div>
                    <div className="post__author-name">비연쎄</div>
                    <div className="post__date">2024.01.19</div>
                </div>
                <div className="post__utils-box">
                    <div className="post__delete">삭제</div>
                    <div className="post__edit"><Link to={`/posts/edit/1`}>수정</Link></div>
                </div>
                <div className="post__text">
                    행복한 날입니다.
                </div>
            </div>
        </div>
    </>
}