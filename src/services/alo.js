function abc(value) {
  a.forEach((item, index) => {
    if (value === null && item.originItem.parentId === null) {
      item.originItem.statusUse = "Gián đoạn";
      a.forEach((item1, index1) => {
        if (item1.originItem.parentId) {
          item1.originItem.statusUse = "Gián đoạn";
        }
      });
    }
    if (item.originItem._id === value) {
      item.originItem.statusUse = "Gián đoạn";
      a.forEach((item2, index2) => {
        let array = item2.originItem.path;
        array.forEach((item3, index3) => {
          if (item.originItem._id === item3) {
            item2.originItem.statusUse = "Gián đoạn";
          }
        });
      });
    }
  });
}
abc("65179899c084cc0e7084f073");

console.log(">>>>>>", a);
