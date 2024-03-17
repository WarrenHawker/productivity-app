import Layout from '../../components/layout/Layout';
import { Editable, useEditor } from '@wysimark/react';
import { useState } from 'react';
import { MarkdownRenderer } from '../../components/markdown/Markdown';

const TODOPage = () => {
  const [markdown, setMarkdown] = useState('');
  const editor = useEditor({});

  return (
    <Layout>
      <main>
        <h1>Todo page</h1>

        <div className="content">
          <Editable editor={editor} value={markdown} onChange={setMarkdown} />
          <MarkdownRenderer>{markdown}</MarkdownRenderer>
        </div>
      </main>
    </Layout>
  );
};

export default TODOPage;
