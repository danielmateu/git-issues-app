import { FC } from 'react';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue, State } from '../interfaces';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../../hooks/useIssue';
import { timeSince } from '../../helpers';

interface Props {
    issue: Issue;
    state: State;
}

export const IssueItem: FC<Props> = ({ issue }) => {

    const { state, title, number, created_at, user, comments } = issue;

    const navigate = useNavigate()

    const queryClient = useQueryClient();

    const prefecthData = () => {
        // console.log('mouse enter');
        queryClient.prefetchQuery(['issue', number],
            () => getIssueInfo(issue.number),
        )

        queryClient.prefetchQuery(['issue', number, 'comments'],
            () => getIssueComments(issue.number),
        )
    }

    const preSetData = () => {
        // console.log('mouse enter');
        queryClient.setQueryData(['issue', number],
            issue,
            {
                updatedAt: new Date().getTime() + 100000
            }
        )
    }

    return (
        <div
            className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${number}`)}
            onMouseEnter={prefecthData}
        >
            <div className="card-body d-flex align-items-center">

                {
                    state === State.Open ?
                        <FiInfo size={30} color="red" /> :
                        <FiCheckCircle size={30} color="green" />
                }

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{title}</span>
                    <span className="issue-subinfo">#{number} opened {timeSince(created_at)} ago</span>
                    <div>
                        {
                            issue.labels.map((label) => (
                                <span
                                    key={label.id}
                                    className="badge rounded-pill me-1"
                                    style={{ backgroundColor: `#${label.color}`, color: '#252525' }}
                                >
                                    {label.name}
                                </span>
                            ))
                        }
                    </div>
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
