import ItemPreview from "./ItemPreview";
import ListPagination from "./ListPagination";
import React from "react";

const ItemList = (props) => {
  if (!props.items) {
    return <div className="py-4">Loading...</div>;
  }

  if (props.title && props.title.length > 0 && props.items.length === 0) {
    const message = (
      <>
        No items found for {'"'}
        <strong>{props.title}</strong>
        {'"'}
      </>
    );

    return (
      <div id="empty" className="py-4 d-flex justify-content-center">
        <div
          className="rounded"
          style={{
            maxWidth: "50rem",
            padding: "4rem",
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <div className="text-center">
            <i
              className="bi bi-emoji-frown-fill"
              style={{ fontSize: "2rem" }}
            ></i>
          </div>
          {message}
        </div>
      </div>
    );
  }

  if (props.items.length === 0) {
    return <div className="py-4 no-items">No items are here... yet.</div>;
  }

  return (
    <div className="container py-2">
      <div className="row">
        {props.items.map((item) => {
          return (
            <div className="col-sm-4 pb-2" key={item.slug}>
              <ItemPreview item={item} />
            </div>
          );
        })}
      </div>

      <ListPagination
        pager={props.pager}
        itemsCount={props.itemsCount}
        currentPage={props.currentPage}
      />
    </div>
  );
};

export default ItemList;
