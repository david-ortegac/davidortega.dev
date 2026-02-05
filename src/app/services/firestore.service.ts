import { Injectable, inject } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where,
  Timestamp 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private firestore = inject(Firestore);
  private articlesCollection = collection(this.firestore, 'articles');

  // Obtener todos los artículos publicados
  getPublishedArticles(): Observable<Article[]> {
    const q = query(
      this.articlesCollection, 
      where('status', '==', 'published'),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Article[]>;
  }

  // Obtener todos los artículos (para la intranet)
  getAllArticles(): Observable<Article[]> {
    const q = query(this.articlesCollection, orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Article[]>;
  }

  // Crear un nuevo artículo
  addArticle(article: Article) {
    const data = {
      ...article,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    return addDoc(this.articlesCollection, data);
  }

  // Actualizar un artículo
  updateArticle(id: string, article: Partial<Article>) {
    const articleDoc = doc(this.firestore, `articles/${id}`);
    return updateDoc(articleDoc, {
      ...article,
      updatedAt: Timestamp.now()
    });
  }

  // Eliminar un artículo
  deleteArticle(id: string) {
    const articleDoc = doc(this.firestore, `articles/${id}`);
    return deleteDoc(articleDoc);
  }
}
