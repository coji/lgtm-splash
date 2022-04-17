import { Post } from '~/interfaces/model'
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot
} from '@google-cloud/firestore'

export const PostConverter: FirestoreDataConverter<Post> = {
  toFirestore: (data: Post): DocumentData => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot) => {
    const data = snapshot.data() as { [key: string]: any }
    Object.keys(data).forEach((key) => {
      // Timestamp は Date 型に変換
      if (
        typeof data[key].toString &&
        data[key].toString().startsWith('Timestamp')
      ) {
        data[key] = data[key].toDate()
      }
    })
    return {
      id: snapshot.id,
      ...(data as Post)
    }
  }
}
