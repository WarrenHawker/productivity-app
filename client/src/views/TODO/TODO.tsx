import Layout from '../../components/layout/Layout';
import { Editable, useEditor } from '@wysimark/react';
import { useState } from 'react';

const TODOPage = () => {
  const [markdown, setMarkdown] = useState('# Hello World');
  const editor = useEditor({});
  console.log(markdown);

  const showMarkdown = () => {
    alert(editor.getMarkdown());
  };

  function toggleEditable() {
    const divElement = document.querySelector('.css-cyr08h');
    if (divElement) {
      divElement.contentEditable =
        divElement.contentEditable === 'true' ? 'false' : 'true';
    }
  }

  return (
    <Layout>
      <main>
        <h1>Todo page</h1>
        <div className="container">
          <Editable editor={editor} value={markdown} onChange={setMarkdown} />
        </div>

        <div>
          <h2>getMarkdown</h2>
          {editor.getMarkdown()}
          <button onClick={showMarkdown}>Show Markdown</button>
          <button onClick={toggleEditable}>Toggle Editable</button>
        </div>
      </main>
    </Layout>
  );
};

export default TODOPage;
