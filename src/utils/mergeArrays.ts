export function mergeArrays(array1, array2) {
    const uuidMap = array2.reduce((acc, obj) => {
      acc[obj.uuid] = obj.id;
      return acc;
    }, {});
    
    const mergedArray = array1.map(obj => ({
        name:`${obj.firstName} ${obj.lastName}`,
        id: uuidMap[obj.id] 
    }));
    return mergedArray;
  }

export const mergeArraysWithoutDuplicat = (arr1, arr2) => {
  const map = new Map();
  
  arr1.forEach(item => map.set(item.id, item));
  arr2.forEach(item => map.set(item.id, item));
  
  return Array.from(map.values());
};