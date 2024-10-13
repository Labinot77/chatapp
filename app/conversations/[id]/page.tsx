import { getMessages } from '@/lib/actions/getMessages';
import Header from './Components/Header';
import { getConversationById } from '@/lib/actions/getConversationById';
import EmptyState from '@/components/EmptyState';
import Body from './Components/Body';
import Form from './Components/Form';

const page = async ({ params }: { params: { id: string } }) => {
  const conversation = await getConversationById(params.id);
  const messages = await getMessages(params.id);

  if (!conversation) {
    return (
      <div className='lg:pl-80 h-full'>
        <div className='h-full flex flex-col'>
          <EmptyState />
        </div>
      </div>
    )
  };

  return (
    <div className='lg:pl-[26rem] lg:p-4 h-full'>
      <div className='h-full flex flex-col'>
        <Header conversation={conversation} />
        <Body initialMessages={messages}/>
        <Form />
      </div>
    </div>
  )
}

export default page