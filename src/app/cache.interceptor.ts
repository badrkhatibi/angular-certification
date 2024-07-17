import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';
import {LocalStorageService} from './local-storage.service';

interface CachedEntity {
    response: HttpResponse<unknown>;
    saveDate: number;
}

@Injectable()
export class CacheInterceptor implements HttpInterceptor {

    private readonly RESPONSES_CACHE: string = 'RESPONSES_CACHE';
    private cache: Map<string, CachedEntity> = new Map(this.localStorageService.getLocalStorage<[string, CachedEntity][]>(this.RESPONSES_CACHE));
    private CACH_DURATION = 2 * 24 * 60 * 60 * 1000; // milliseconds
    constructor(private localStorageService: LocalStorageService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const cachedResponse = this.cache.get(request.url);
        if (cachedResponse && new Date().getTime() < cachedResponse.saveDate) {
            return of(new HttpResponse(cachedResponse.response))
        }
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                this.cache.set(event.url, {response: event, saveDate: (new Date().getTime() + this.CACH_DURATION)});
                this.localStorageService.setLocalStorage(this.RESPONSES_CACHE, Array.from(this.cache.entries()))
            }
            return event
        }));
    }
}
