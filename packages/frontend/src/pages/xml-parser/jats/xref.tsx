import xpath from "xpath";

export interface Props {
  node: Node;
}

export const XRef = (props: Props) => {
  const { node } = props;
  const id = xpath.select1("string(@rid)", node);
  return (
    <a
      id={`cite_${id}`}
      href={`#${id}`}
      data-type={xpath.select1("string(@ref-type)", node)}
    >
      {node.textContent}
    </a>
  );
};
