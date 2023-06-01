import { FC } from 'react';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';



interface Props {
    issue: Issue;
    state: State;
}


export const IssueItem: FC<Props> = ({ issue }) => {

    const { state, title, number, created_at, user, comments } = issue;
    
    return (
        <div className="card mb-2 issue">
            <div className="card-body d-flex align-items-center">

                {/* <FiInfo size={30} color="red" /> */}
                {/* <FiCheckCircle size={30} color="green" /> */}
                {
                    state === State.Open ?
                        <FiInfo size={30} color="red" /> :
                        <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{title}</span>
                    <span className="issue-subinfo">#{number} opened {Math.floor((new Date().getTime() - new Date(created_at).getTime()) / (1000 * 3600 * 24))} {
                        Math.floor((new Date().getTime() - new Date(created_at).getTime()) / (1000 * 3600 * 24)) === 1 ? 'day' : 'days'
                    } ago by <span className='fw-bold'>{user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
