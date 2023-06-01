import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../../hooks/useIssue';
import { Issue } from '../interfaces';
import { FC } from 'react';
import { LoadingIcon } from '../../shared/components/LoadingIcon';

interface Props {
  body: string;
  issue: Issue;

}

export const IssueView: FC<Props> = ({ body, issue }) => {

  const params = useParams<{ id: string }>();
  const { id = '0' } = params;

  const { issueQuery, issueCommentsQuery } = useIssue((+id))

  // LoadingIcon

  if (issueQuery.isLoading) {
    return <LoadingIcon />
  }

  // issueQuery.data <----- no hay data
  // Navigate to = './issues/list'
  if (!issueQuery.data) {
    return <Navigate to='./issues/list' />
  }

  // issueQuery.data <----- si hay data cargar el componente
  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      <IssueComment
        body={issueQuery.data?.body}
        issue={issueQuery.data}
      />

      {
        issueCommentsQuery.isLoading && <LoadingIcon />
      }

      {
        issueCommentsQuery.data?.map((issue) => (
          <IssueComment
            key={issue.id}
            body={issue.body}
            issue={issue}
          />
        ))
      }
    </div>
  )
}
